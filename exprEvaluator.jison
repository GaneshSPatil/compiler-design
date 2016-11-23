
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"if"                  return 'if'
"true"                return 'BOOLEAN'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"^"                   return '^'
"!"                   return '!'
"/"                   return '/'
"("                   return '('
")"                   return ')'
"{"                   return '{'
"}"                   return '}'
";"                   return ';'
"="                   return '='
[a-z]+                currentLoc = yylloc; return 'VARIABLE'
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
  allTrees = { nodes:[]};
  allTrees.previous = allTrees;
  current = allTrees;

  currentLoc = undefined;
  var path = require('path');
  var NumberNode = require(path.resolve('./lib/Nodes/NumericNode.js'));
  var OperatorNode = require(path.resolve('./lib/Nodes/OperatorNode.js'));
  var AssignmentNode = require(path.resolve('./lib/Nodes/AssignmentNode.js'));
  var VariableNode = require(path.resolve('./lib/Nodes/VariableNode.js'));
  var FactorialNode = require(path.resolve('./lib/Nodes/FactorialNode.js'));
  var PowerOfNode = require(path.resolve('./lib/Nodes/PowerOfNode.js'));
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'
%left '^'
%left '!'

%start expressions

%% /* language grammar */
expressions
    : multipleStatements EOF
        { return allTrees.nodes; }
    ;

multipleStatements
  : e ';'
    {current.nodes.push($$); $$=current;}
  | assgn ';'
    {current.nodes.push($$); $$=current;}
  | block ';'
    {current.nodes.unshift($2.nodes); $$=current;}

  | e ';' multipleStatements
    { current.nodes.unshift($$); $$=$3;}
  | assgn ';' multipleStatements
    { current.nodes.unshift($$); $$=$3;}
  | block ';' multipleStatements
    { current.nodes.unshift($2.nodes); $$=$5;}
  ;

assgn
  :'VARIABLE' '=' e
    {$$ = new AssignmentNode($2, [$1, $3]);}
  ;

openBracket
  : '{'
    {current = {nodes:[], previous:current}; $$=current; }
  ;

closeBracket
  : '}'
    {current = current.previous; $$=current; }
  ;

block
  : openBracket multipleStatements closeBracket
    {$$ = $2}
  ;

e
    : e '/' e
      {$$ = new OperatorNode($2, [$1, $3]);}
    | e '+' e
      {$$ = new OperatorNode($2, [$1, $3]);}
    | e '-' e
      {$$ = new OperatorNode($2, [$1, $3]);}
    | e '*' e
      {$$ = new OperatorNode($2, [$1, $3]);}
    | e '^' e
      {$$ = new PowerOfNode($2, [$1, $3]);}
    | e '!'
      {$$ = new FactorialNode($2, $1);}
    | '(' e ')'
        {$$ = $2;}
    | 'NUMBER'
        {$$ = new NumberNode(yytext);}
    | 'VARIABLE'
        {$$ = new VariableNode(yytext, currentLoc);}
    ;
