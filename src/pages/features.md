---
layout: '@layouts/BaseLayout.astro'
title: Fielded Text Features
---

* **Fields separated by a delimiter character**\
CSV files have fields separated by delimiters - normally the comma character.  Delimited fields are supported and the delimiter character can be specified.
* **Fixed Length Fields**\
Some text files store values using fixed length fields.  Since the length of each field is predetermined, these files do not use delimiters to specify when each field ends.  TFieldedText supports fixed length fields and lets you specify the width, truncation and padding on a field by field basis.
* **Mixed Fixed Length and Delimiter separated fields in a line**\
TFieldedText even supports files which use both Delimited fields and Fixed Length fields in the same line.
* **Quoted Fields (Optional or Explicit)**\
Often text files surround field values with a quote character - normally the double quote character (") is used.  This allows the field values to include the delimiter character or End Of Line character which normally could not be embedded inside a field value.  It also makes it clear which white space characters are part of the field value.TFieldedText allows you to specify whether or fields are quoted on a field by field basis.  It even allows you to specify that a field is optionally quoted in which case it will determine whether an individual value is quoted and handle it accordingly.  You can also specify which character is used as the quoted character however this applies to all fields.
* **New Lines in Quotes**\
Sometimes field values contain New Line characters (eg Line Feed character).  This can occur for example, if a field value contains paragraphs of text.  TFieldedText lets you specify whether field values are allowed to contain New Line characters.
* **Automatic New Line detection or specified New Line character**\
There are different conventions for ending a line in a text file.  TFieldedText automatically detects what type of convention is being used to end a line.  Alternatively, you can explicitly specify which character specifies the end of a line.
* **Comments**\
Some text files include comment lines.  These lines should be ignored when parsing as they do not contain values.  TFieldedText lets you specify a line comment character.  Lines beginning with this character are treated as comments.
* **Ignoring Blank Lines**\
Sometimes text files contain blank lines which should be ignored. TFieldedText lets you specify if blank lines are to be ignored.
* **Ignoring extra characters/fields in lines**\
By default, TFieldedText will parse a line until it has extracted all the values from the fields it expects from a line.  Any extra characters after that in the line, are ignored.  This allows new fields to be added to a text file without "breaking" existing software which parses that text file.You can however specify, that TFieldedText should not expect any extra characters after the last field in a line.
* **Handling language cultures**\
Different languages have different conventions in how to display numbers and how to compare text. For example, in English, a period (.) is used to designate a decimal point whereas in German, a comma (,) is used.TFieldedText lets you specify the culture to be used when parsing or generating text files.  The conventions appropriate for that language will then be used.
* **Character Encodings**\
Characters need to be converted to binary values before being written to a file (and vice versa when reading).  There are several ways in which this "encoding" can be done.  TFieldedText lets you specify which character encoding should be used, including: ASCII, UTF-7, UTF-8 and UTF-16.  TFieldedText can also be set to automatically detect what encoding to use when reading a file.
* **Multiple Heading Lines (both delimited and fixed length)**\
Text Files sometimes include heading lines which provide headings for each of the field.  TFieldedText will both parse and generate heading lines.
* **Substitutions (escape sequences)**\
Substitutions allow strings or characters to represented in a file with tokens.  They are similar to Escape Sequences in the 'C' language; a substitution character (escape) character identifies a substitution and the next character (the token) specifies what string should be substituted.  These are very useful for including non-printable characters in field values.TFieldedText allows several types of substitutions - including: String, New Line and XML substitutions.  It also allows you to specify the character to be used as the substitution character.
* **Embedded (Stuffed) Quote Characters**\
Some quoted field values also contain the quote character.  One way of embedding the quote character is to include 2 successive quote characters to represent one quote character (stuffed quote character).  TFieldedText supports stuffed embedding of quote characters.
* **Boolean, DateTime, Decimal, Float, Integer and String fields**\
Fields can hold values with different data types.  TFieldedText supports the following data types:

    * Boolean
    * DateTime
    * Float (up to Double range and precision)
    * Decimal (Base 10 Floats for better handling of rounding errors)
    * Integer (up to 64 bits)
    * String 

* **Null fields**\
Sometimes a field value is undefined.  TFieldedText provides several methods for detecting and specifying Null field values.
* **Constant fields**\
In some files, a field always has to have the same value.  TFieldedText allows fields to be declared as constants and what that constant should be.  In this case, all values for that field need to match the constant specified, otherwise a parsing error occurs.
* **Specify format and styles of fields**\
Booleans, datetimes, and numbers can be formatted in many different ways in a text file.  TFieldedText lets you specify the formatting and style of these data types, on a field by field basis.
* **Field Heading Constraints**\
TFieldedText can use headings for fields to do the following:

    * Check that the heading for each field is as expected.
    * Use the heading as the name of a field. 

* **Lines can have different sequences of fields based on the value of "key" fields**\
Some files have can have lines with different sets of fields.  Typically, one of the fields is used as a key.  The value a key field contains, determines the sequence of fields for the rest of the line.  TFieldedText supports these types of files by using 'Sequences'.

