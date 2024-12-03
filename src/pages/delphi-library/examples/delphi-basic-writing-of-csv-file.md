---
title: Basic writing of CSV file
---

This tutorial demonstrates how to use the TFieldedText component to write headings and records to a CSV file.

The 2 headings and 4 records to be written to the file, are shown in the table below:

|Pet Name |Age     |Color  |Date Received |Price     |Needs Walking |Type       |
|:-------:|:------:|:-----:|:------------:|:--------:|:------------:|:---------:|
|         |(Years) |       |              |(Dollars) |              |           |
|Rover    |4.5     |Brown  |12 Feb 2004   |80        |True          |Dog        |
|Charlie  |        |Gold   |5 Apr 2007    |12.3      |False         |Fish       |
|Molly    |2       |Black  |12 Dec 2006   |25        |False         |Cat        |
|Gilly    |        |White  |10 Apr 2007   |10        |False         |Guinea Pig |


By using TFieldedText to write the CSV file, you do not have to worry about formatting. TFieldedText will ensure that the data in the CSV file is laid out as specified by the Meta.

The full source code for this tutorial lesson can be downloaded from the component's home page

## Step 1: Select a folder

Create or select an empty folder for the program we are going to develop.

## Step 2: Create Fielded Text Meta file

The Meta file specifies the structure of the text file.  In this step we will create a Meta file called "BasicExample.ftm" for the text file.  There are 2 ways of doing this.

The easy way is to simply download the Meta file from here (Right Click | Save Link/Target As) and place in the folder where the compiled executable will run from.

Alternatively, you can create it with a Fielded Text Editor.  This will provide a better understanding of what a Meta file actually is.  Follow the steps here to create the "BasicExample.ftm" and then save it into the folder where the compiled executable will run from.

The contents of the Fielded Text Meta File should be similar to the text shown below:

```xml
<?xml version="1.0" encoding="utf-8"?>
<FieldedText HeadingLineCount="2" HeadingWritePrefixSpace="True">
  <Field Name="PetName" ValueQuotedType="Always" HeadingWritePrefixSpace="False" Headings="Pet Name" />
  <Field DataType="Float" Name="Age" ValueWritePrefixSpace="True" Headings="Age, " />
  <Field Name="Color" ValueWritePrefixSpace="True" Headings="Color, (Years)" />
  <Field DataType="DateTime" Name="DateReceived" ValueWritePrefixSpace="True" Headings="Date Received, " Format="d MMM yyyy" />
  <Field DataType="Decimal" Name="Price" ValueWritePrefixSpace="True" Headings="Price, (Dollars)" />
  <Field DataType="Boolean" Name="NeedsWalking" ValueWritePrefixSpace="True" Headings="Needs Walking, " />
  <Field Name="Type" ValueQuotedType="Always" ValueWritePrefixSpace="True" Headings="Type" />
</FieldedText>
```

## Step 3: Create a Delphi VCL Forms Application project

Create a Delphi VCL Forms Application project in the folder using a recent version of Delphi.  Either a 32 or 64 bit application can be created.

## Step 4: Include TFieldedText files folder in search path

Add a the folder containing either TFieldedText source files or DCU files to the project search path. Must be version 2.2.10 or later.

## Step 5: Place controls on Form

Add the following items to a form in the project:

* A TMemo with Name = "Memo1"
* A Button

Step 6: Add FieldedText uses clauses and Button Click event

Add the following uses clause and Button Click event code:

```
uses
  Xilytix.FieldedText.Main;

procedure TForm1.Button1Click(Sender: TObject);
var
  FieldedText: TFieldedText;

  PetNameField: TFieldedTextField;
  AgeField: TFieldedTextField;
  ColorField: TFieldedTextField;
  DateReceivedField: TFieldedTextField;
  PriceField: TFieldedTextField;
  NeedsWalkingField: TFieldedTextField;
  TypeField: TFieldedTextField;

  Bldr: TStringBuilder;
  Writer: TStringWriter;
begin
  FieldedText := TFieldedText.Create;
  try
    // Load the Meta which describes the text file
    // A Fielded Text Editor is used to create the Meta File.
    FieldedText.LoadMeta('BasicExample.ftm');

    // Find Fields
    PetNameField := FieldedText.FindField('PetName');
    AgeField := FieldedText.FindField('Age');
    ColorField := FieldedText.FindField('Color');
    DateReceivedField := FieldedText.FindField('DateReceived');
    PriceField := FieldedText.FindField('Price');
    NeedsWalkingField := FieldedText.FindField('NeedsWalking');
    TypeField := FieldedText.FindField('Type');

    // Set up Headers
    PetNameField.Headings[0] := 'Pet Name';
    AgeField.Headings[0] := 'Age';
    AgeField.Headings[1] := '(Years)';
    ColorField.Headings[0] := 'Color';
    DateReceivedField.Headings[0] := 'Date Received';
    PriceField.Headings[0] := 'Price';
    PriceField.Headings[1] := '(Dollars)';
    NeedsWalkingField.Headings[0] := 'Needs Walking';
    TypeField.Headings[0] := 'Type';

    // Create a writer
    Bldr := TStringBuilder.Create;
    try
      Writer := TStringWriter.Create(Bldr);
      try
        // Start writing.  Header will automatically be written
        FieldedText.BeginWrite(Writer);
        try
          // Set up values for first record
          PetNameField.AsString := 'Rover';
          AgeField.AsDouble := 4.5;
          ColorField.AsString := 'Brown';
          DateReceivedField.AsDateTime := EncodeDate(2004, 2, 12);
          PriceField.AsCurrency := 80.0;
          NeedsWalkingField.AsBoolean := True;
          TypeField.AsString := 'Dog';

          // Write First Record
          FieldedText.WriteRecord;

          // Repeat for next 3 records
          PetNameField.AsString := 'Charlie';
          AgeField.Null := True;
          ColorField.AsString := 'Gold';
          DateReceivedField.AsDateTime := EncodeDate(2007, 4, 5);
          PriceField.AsCurrency := 12.3;
          NeedsWalkingField.AsBoolean := False;
          TypeField.AsString := 'Fish';
          FieldedText.WriteRecord;

          PetNameField.AsString := 'Molly';
          AgeField.AsDouble := 2.0;
          ColorField.AsString := 'Black';
          DateReceivedField.AsDateTime := EncodeDate(2006, 12, 12);
          PriceField.AsCurrency := 25;
          NeedsWalkingField.AsBoolean := False;
          TypeField.AsString := 'Cat';
          FieldedText.WriteRecord;

          PetNameField.AsString := 'Gilly';
          AgeField.Null := True;
          ColorField.AsString := 'White';
          DateReceivedField.AsDateTime := EncodeDate(2007, 4, 10);
          PriceField.AsCurrency := 10.0;
          NeedsWalkingField.AsBoolean := False;
          TypeField.AsString := 'Guinea Pig';
          FieldedText.WriteRecord;

          // Finish Writing
        finally
          FieldedText.EndWrite;
        end;

        Writer.Close;
      finally
        Writer.Free;
      end;

      // Place in Memo
      Memo1.Text := Bldr.ToString;
    finally
      Bldr.Free;
    end;

  finally
    FieldedText.Free;
  end;
end;
```

## Step 7: Compile and Run

Compile and run the program.  When the button is clicked, the program will do the following:

* Create a TFieldedText object
* Load the Meta
* Get the fields
* Set up the headings in the TFieldedText object
* Create a StringWriter to write text to a StringBuilder
* Use TFieldedText.BeginWrite to initiate writing of text.  This call will automatically write the headings.
* Write the records
* Use TFieldedText.EndWrite to finish the writing process
* Place generated string in the Memo control

