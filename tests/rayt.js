//This file is done by programmers to test their code.

var testRunner = new TestRunner();

var RAYTTestSuite = new TestSuite('RAYT test suite');/*{{{*/
RAYTTestSuite.add(new TestCase('Make sure RAYT is present', test_rayt));
RAYTTestSuite.add(new TestCase('Make sure functions are present', test_functions));
RAYTTestSuite.add(new TestCase('Make sure settings are present', test_settings));
//RAYTTestSuite.add(new TestCase('Test regular expression handling functions', test_regex));

testRunner.add(RAYTTestSuite);

function test_rayt(){/*{{{*/
  assertNotUndefined('RAYT object exists', rayt);
}/*}}}*/

function test_functions(){/*{{{*/
  assertNotUndefined('onLoad function exists', rayt.onLoad);	
  assertNotUndefined('replaceAll function exists', rayt.replaceAll);	
  assertNotUndefined('replaceCurrent function exists', rayt.replaceCurrent);	
  assertNotUndefined('replaceSelection function exists', rayt.replaceSelection);	
  assertNotUndefined('replaceText function exists', rayt.replaceText);	
  assertNotUndefined('showContextMenu function exists', rayt.showContextMenu);	
}/*}}}*//*}}}*/

function test_settings(){/*{{{*/
	assertTrue('initialized', initialized);
}/*}}}*/

function test_regex(){/*{{{*/
	assertEquals('replaceDoublePrimes', '"test"', rayt.replaceDoublePrimes('"test"'));
}/*}}}*/
