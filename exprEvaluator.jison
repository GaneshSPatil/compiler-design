
/* description: Parses and executes mathematical expressions. */

/* lexical grammar */
%lex
%%

\s+                   /* skip whitespace */

[0-9]+("."[0-9]+)?\b  return 'NUMBER'
[a-z]+                return 'VARIABLE'
"+"                   return '+'
"-"                   return '-'
"*"                   return '*'
"^"                   return '^'
"!"                   return '!'
"/"                   return '/'
"("                   return '('
")"                   return ')'
";"                   return ';'
"="                   return '='
<<EOF>>               return 'EOF'
.                     return 'INVALID'

/lex
%{
  allTrees = [];
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
    : block EOF
        {
          return $$;
        }
    ;
block
  : e ';'
    {allTrees.push($$); $$=allTrees;}
  | assgn ';'
    {allTrees.push($$); $$=allTrees;}
  | e ';' block
    { allTrees.unshift($$); $$=$3;}
  | assgn ';' block
    { allTrees.unshift($$); $$=$3;}
  ;

assgn
  :'VARIABLE' '=' e
    {$$ = new AssignmentNode($2, [$1, $3]);}
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
        {$$ = new VariableNode(yytext);}
    ;
