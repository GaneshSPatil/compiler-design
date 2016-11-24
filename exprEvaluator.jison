
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */

%lex
%%
\s+                   /* skip whitespace */
[0-9]+("."[0-9]+)?\b  return 'NUMBER'
"if"                  return 'if'
"else"                return 'else'
"elsif"                return 'elsif'
"true"                return 'BOOLEAN'
"false"               return 'BOOLEAN'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"^"                   return '^'
"!"                   return '!'
"/"                   return '/'
"%"                   return '%'
"("                   return '('
")"                   return ')'
"{"                   return '{'
"}"                   return '}'
"<"                   return '<'
">"                   return '>'
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
  var ArithmeticOperatorNode = require(path.resolve('./lib/Nodes/ArithmeticOperatorNode.js'));
  var AssignmentNode = require(path.resolve('./lib/Nodes/AssignmentNode.js'));
  var VariableNode = require(path.resolve('./lib/Nodes/VariableNode.js'));
  var FactorialNode = require(path.resolve('./lib/Nodes/FactorialNode.js'));
  var PowerOfNode = require(path.resolve('./lib/Nodes/PowerOfNode.js'));
  var IfNode = require(path.resolve('./lib/Nodes/IfNode.js'));
  var BooleanNode = require(path.resolve('./lib/Nodes/BooleanNode.js'));
%}

/* operator associations and precedence */

%left '>' '<'
%left '+' '-'
%left '%'
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
  | cond ';'
    {current.nodes.unshift($$); $$=current;}

  | e ';' multipleStatements
    { current.nodes.unshift($$); $$=$3;}
  | assgn ';' multipleStatements
    { current.nodes.unshift($$); $$=$3;}
  | cond ';' multipleStatements
    { current.nodes.unshift($$); $$=$3;}
  ;

cond
  :IF
    {$$ = new IfNode($1[0], $1[1].nodes, []);}
  | IF ELSE
    {$$ = new IfNode($1[0], $1[1].nodes, $2);}

  ;

IF
  : 'if' boolean block
    {$$ = [$2, $3];}
  | 'if' e block
    {$$ = [$2, $3];}
  ;

ELSE
  : 'else' block
    { $$ = $2.nodes;}
  | 'elsif' boolean block ELSE
    {$$ = [new IfNode($2, $3.nodes, $4)];}
  ;

assgn
  :'VARIABLE' '=' e
    {$$ = new AssignmentNode($2, [$1, $3]);}
  |'VARIABLE' '=' boolean
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
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '+' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '-' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '*' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '^' e
      {$$ = new PowerOfNode($2, [$1, $3]);}
    | e '%' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '>' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '<' e
      {$$ = new ArithmeticOperatorNode($2, [$1, $3]);}
    | e '!'
      {$$ = new FactorialNode($2, $1);}
    | '(' e ')'
        {$$ = $2;}
    | 'NUMBER'
        {$$ = new NumberNode(yytext);}
    | 'VARIABLE'
        {$$ = new VariableNode(yytext, currentLoc);}
    ;

boolean
  : 'BOOLEAN'
    {$$ = new BooleanNode($1);}
  ;
