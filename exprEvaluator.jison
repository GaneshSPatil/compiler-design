
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
%}

/* operator associations and precedence */

%left '+' '-'
%left '*' '/'

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
    {$$ = {op: $2, args:[$1, $3]};}
  ;

e
    : e '/' e || e '+' e
      {$$ = {op: $2, args:[$1, $3]};}
    | e '-' e
      {$$ = {op: $2, args:[$1, $3]};}
    | e '*' e
      {$$ = {op: $2, args:[$1, $3]};}
    | '(' e ')'
        {$$ = $2;}
    | 'NUMBER'
        {$$ = Number(yytext);}
    | 'VARIABLE'
        {$$ = yytext;}
    ;
