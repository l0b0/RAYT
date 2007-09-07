//This file is done by programmers to test their code.

var testRunner = new TestRunner();

var myTestSuite1 = new TestSuite("XulUnit Passing TestSuite");/*{{{*/
myTestSuite1.add(new TestCase("TestCase Assert Functions", test_1a));
myTestSuite1.add(new TestCase("TestCase AssertEquals Functions", test_2a));
myTestSuite1.add(new TestCase("TestCase AssertRegExp Functions", test_3a));
myTestSuite1.add(new TestCase("TestCase AssertTypeOf Functions", test_4a));
testRunner.add(myTestSuite1);

function test_1a(){/*{{{*/
  assert("Assert value", true);
  var trueVar = true;
  assert("Assert var", trueVar);
  assertTrue("AssertTrue value", true);
  assertTrue("AssertTrue var", trueVar);
  assertFalse("AssertFalse value", false);
  var falseVar = false;
  assertFalse("AssertFalse var", falseVar);
  assertNull("AssertNull value", null);
  var nullVar = null;
  assertNull("AssertNull var", nullVar);
  assertNotNull("AssertNotNull value", "something");
  var notNullVar = "something";
  assertNotNull("AssertNotNull var", notNullVar);
  assertNaN("AssertNaN value", "text");
  var NaNVar = "text";
  assertNaN("AssertNaN var", NaNVar);
  assertNotNaN("AssertNotNaN value", 5);
  var number = 13;
  assertNotNaN("AssertNotNaN var", number);
  assertNotUndefined("AssertNotUndefined value", "defined");
  var defined = "something";
  assertNotUndefined("AssertNotUndefined var", defined);
  var notDefined;
  assertUndefined("AssertUndefined var", notDefined);
}/*}}}*/

function test_2a(){/*{{{*/
  assertEquals("AssertEquals Number value", 5, 5);
  var number = 5;
  assertEquals("AssertEquals Number var", 5, number);
  assertNotEquals("AssertNotEquals Number value", 5, 13);
  assertNotEquals("AssertNotEquals Number var", 13, number);
  
  assertEquals("AssertEquals Text value", "something", "something");
  var text = "something";
  assertEquals("AssertEquals Text var", "something", text);
  assertNotEquals("AssertNotEquals Text value", "other", "something");
  assertNotEquals("AssertNotEquals Text var", "other", text);
  
  var object = new Object();
  object.attribute = "value";
  var object2 = new Object();
  object2.attribute = "value";
  assertEquals("AssertEquals Object", object, object);
  assertNotEquals("AssertNotEquals Object", object, object2);
}/*}}}*//*}}}*/

function test_3a(){/*{{{*/
	var string = "xulunit";
	assertRegExp("TestCase AssertRegExp", "ulu", string);
	assertNotRegExp("TestCase AssertNotRegExp", "mozilla", string);
}/*}}}*/

function test_4a(){/*{{{*/
	var string = "string2";
	var number = 1;
	var b_oolean = true;
	var f_unction = test_3a;
	var object = new Object();
	assertTypeOf("TestCase AssertTypeOf String", "string", string);
	assertTypeOf("TestCase AssertTypeOf Number", "number", number);
	assertTypeOf("TestCase AssertTypeOf Boolean", "boolean", b_oolean);
	assertTypeOf("TestCase AssertTypeOf Function", "function", f_unction);
	assertTypeOf("TestCase AssertTypeOf Object", "object", object);
	assertNotTypeOf("TestCase AssertNotTypeOf String", "string", number);
	assertNotTypeOf("TestCase AssertNotTypeOf Number", "number", string);
	assertNotTypeOf("TestCase AssertNotTypeOf Boolean", "boolean", f_unction);
	assertNotTypeOf("TestCase AssertNotTypeOf Function", "function", object);
	assertNotTypeOf("TestCase AssertNotTypeOf Object", "object", b_oolean);
}/*}}}*/

var myTestSuite2 = new TestSuite("XulUnit Failing TestSuite");/*{{{*/
myTestSuite2.add(new TestCase("TestCase Falling Assert Functions", test_1b));
myTestSuite2.add(new TestCase("TestCase Falling AssertEquals Functions", test_2b));
testRunner.add(myTestSuite2);

function test_1b(){/*{{{*/
  assert("Assert value", false);
  var trueVar = false;
  assert("Assert var", trueVar);
  assertTrue("AssertTrue value", false);
  assertTrue("AssertTrue var", trueVar);
  assertFalse("AssertFalse value", true);
  var falseVar = true;
  assertFalse("AssertFalse var", falseVar);
  assertNull("AssertNull value", "not null");
  var nullVar = "not null";
  assertNull("AssertNull var", nullVar);
  assertNotNull("AssertNotNull value", null);
  var notNullVar = null;
  assertNotNull("AssertNotNull var", notNullVar);
  assertNaN("AssertNaN value", 5);
  var NaNVar = 5;
  assertNaN("AssertNaN var", NaNVar);
  assertNotNaN("AssertNotNaN value", "NaN");
  var number = "NaN";
  assertNotNaN("AssertNotNaN var", number);
  var defined;
  assertNotUndefined("AssertNotUndefined var", defined);
  var notDefined = "something";
  assertUndefined("AssertUndefined var", notDefined);
}/*}}}*/

function test_2b(){/*{{{*/
  assertEquals("AssertEquals Number value", 13, 5);
  var number = 5;
  assertEquals("AssertEquals Number var", 13, number);
  assertNotEquals("AssertNotEquals Number value", 5, 5);
  assertNotEquals("AssertNotEquals Number var", 5, number);
  
  assertEquals("AssertEquals Text value", "other", "something");
  var text = "something";
  assertEquals("AssertEquals Text var", "other", text);
  assertNotEquals("AssertNotEquals Text value", "something", "something");
  assertNotEquals("AssertNotEquals Text var", "something", text);
  
  var object = new Object();
  object.attribute = "value";
  var object2 = new Object();
  object2.attribute = "value";
  assertEquals("AssertEquals Object", object2, object);
  assertNotEquals("AssertNotEquals Object", object, object);
}/*}}}*//*}}}*/

var myTestSuite3 = new TestSuite("XulUnit Unknown TestSuite");/*{{{*/
myTestSuite3.add(new TestCase("TestCase with Unknown Result", test_1c));
testRunner.add(myTestSuite3);

function test_1c(){/*{{{*/
  //No assert functions called, so no test is done
}/*}}}*//*}}}*/

var myTestSuite4 = new TestSuite("XulUnit Breaking TestSuite");/*{{{*/
myTestSuite4.add(new TestCase("Test Case 1c", test_1d));
testRunner.add(myTestSuite4);

function test_1d(){/*{{{*/
  assert("Assert", undefinedFunction);
}/*}}}*//*}}}*/
