grammar gwhile;

options{
	output=AST;
}

tokens{
	PROGDEF;
	FONCTION_DEF;
	BODY;
	INPUTSUB;
	OUTPUT;
	COMMAND;
	VARIABLE_DEF;
	IF;
	WHILE;
	FOR;
	FOREACH;
	EXPRESSION;
	CONS;
	LIST;
	HD;
	TL;
	VARIABLE;
	FUNCTION;
	VARIABLE_DEF_NAMES;
	VARIABLE_DEF_VALUES;
	STRING;
}

program	:	function+ -> ^(PROGDEF function+);
function	:	'function' Symbol ':' definition -> ^(FONCTION_DEF Symbol definition);
definition	:	'read' input '%' commands '%' 'write' output -> ^(BODY input? commands output);
input	:	inputSub? -> ^(INPUTSUB inputSub)?;
inputSub	:	Variable (',' inputSub)? -> Variable (inputSub)?;
output	: 	Variable (',' output)? -> ^(OUTPUT Variable (output)?);
commands	:	command (commands)? -> ^(COMMAND command (commands)?);
vars 	:	Variable (',' vars)? -> Variable vars?;
exprs	:	expression (',' exprs)? -> expression exprs?;

command	:	'nop' | (vars ':=' exprs) -> ^(VARIABLE_DEF ^(VARIABLE_DEF_NAMES vars) ^(VARIABLE_DEF_VALUES exprs))
		| ( 'if' expression 'then' commands ('else' commands)? 'fi') -> ^(IF expression commands (commands)?)
		| ( 'while' expression 'do' commands 'od') -> ^(WHILE expression commands)
		| ( 'for' expression 'do' commands 'od') -> ^(FOR expression commands)
		| ( 'foreach' Variable 'in' expression 'do' commands 'od') -> ^(FOREACH Variable expression commands);


expression 	:	exprBase ('?=' exprBase)? -> exprBase exprBase?;

exprBase	:	'nil' | Variable -> ^(VARIABLE Variable) | Symbol -> ^(STRING Symbol) 
		| ('(' 'cons ' lexpr ')') -> ^(CONS lexpr)
		| ('(' 'list' lexpr ')') -> ^(LIST lexpr)
		| ('(' 'hd' exprBase ')') -> ^(HD exprBase) 
		| ('(' 'tl' exprBase ')') -> ^(TL exprBase) 
		| ('(' Symbol lexpr ')') -> ^(FUNCTION Symbol lexpr?);

lexpr	: 	(exprBase lexpr)?;

Variable	:	Maj(Maj|Min|Dec)* ('!'|'?')?;
Symbol	:	Min(Maj|Min|Dec)* ('!'|'?')?;

fragment Maj	:	('A'..'Z');
fragment Min	:	('a'..'z');
fragment Dec	:	('0'..'9');

SPACES :  ' ' {$channel = HIDDEN;};

BACKSLASHN :  '\n' {$channel = HIDDEN;};

BACKSLASHR :  '\r' {$channel = HIDDEN;};

COMMENT :	'//'~('\r' | '\n')*'\n'? {$channel = HIDDEN;}
		| '/*' (options{greedy=false;}:.)*'*/'{$channel = HIDDEN;}
		;