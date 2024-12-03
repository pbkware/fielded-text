---
layout: '@layouts/BaseLayout.astro'
title: Build Meta with Sequences
---

This example shows how to programmatically build a Meta which contains Sequences.  The Meta generated in this example is shown below.

```xml
<?xml version="1.0" encoding="utf-8"?>
<FieldedText>
  <Field Name="Type" DataType="Integer" />
  <Field Name="Name" Id="1" />
  <Field Name="RunningSpeed" Id="2" DataType="Float" />
  <Field Name="WalkDistance" Id="3" DataType="Float" />
  <Field Name="Training" Id="4" DataType="Boolean" />
  <Field Name="Trainer" Id="5" />
  <Field Name="SessionCost" Id="6" DataType="Decimal" />
  <Field Name="Color" Id="7" />
  <Field Name="ChineseClassification" Id="8" />
  <Sequence Name="Root" Root="True" FieldIndices="1">
    <Item FieldIndex="0">
      <Redirect SequenceName="Cat" InvokationDelay="AfterSequence" Value="1" />
      <Redirect SequenceName="Dog" InvokationDelay="AfterSequence" Value="2" />
      <Redirect SequenceName="GoldFish" InvokationDelay="AfterSequence" Value="3" />
    </Item>
  </Sequence>
  <Sequence Name="Cat" FieldIndices="2" />
  <Sequence Name="Dog">
    <Item FieldIndex="3" />
    <Item FieldIndex="2" />
    <Item FieldIndex="4">
      <Redirect SequenceName="Training" Value="True" />
    </Item>
  </Sequence>
  <Sequence Name="GoldFish" FieldIndices="7,8" />
  <Sequence Name="Training" FieldIndices="5,6" />
</FieldedText>
```

This Meta is for a CSV file which lists 3 types of pets.  For each pet the Meta will specify its type and its name.  These 2 fields make the root sequence.

Pet type 1 is cats.  For each cat it will specify its running speed (Cat Sequence)

Pet type 2 is dogs.  For each dog it will specify its walking distance, its running speed and whether it is being trained. (Dog Sequence).

If a dog is being trained, it will also specify the trainer and the cost of each training session. (Training Sequence)

Pet type 3 is gold fish. For each gold fish, it will specify its color and chinese classification (GoldFish sequence).

An example CSV file using this format is shown below:

```text
1,Misty,45
1,Oscar,35
2,Buddy,0.5,35,False
2,Charlie,2,48,True,John,32.0
2,Max,0.5,30,False
3,Bubbles,Orange,Wen
3,Flash,Yellow,Crucian
```

Below is an example Console Application showing how this Meta is programmatically created and then saved to a file.

```csharp
using Xilytix.FieldedText;

namespace BuildMetaWithSequences
{
    class Program
    {
        static void Main(string[] args)
        {
            const string MetaFileName = "ExampleSequenceMeta.ftm";

            // Define Field Names
            const string TypeFieldName = "Type";
            const string NameFieldName = "Name";
            const string RunningSpeedFieldName = "RunningSpeed";
            const string WalkDistanceFieldName = "WalkDistance";
            const string TrainingFieldName = "Training";
            const string TrainerFieldName = "Trainer";
            const string SessionCostFieldName = "SessionCost";
            const string ColorFieldName = "Color";
            const string ChineseClassificationFieldName = "ChineseClassification";

            // Define Field Ids
            const int TypeFieldId = 0;
            const int NameFieldId = 1;
            const int RunningSpeedFieldId = 2;
            const int WalkDistanceFieldId = 3;
            const int TrainingFieldId = 4;
            const int TrainerFieldId = 5;
            const int SessionCostFieldId = 6;
            const int ColorFieldId = 7;
            const int ChineseClassificationFieldId = 8;

            // Define Sequence Names
            const string RootSequenceName = "Root";
            const string CatSequenceName = "Cat";
            const string DogSequenceName = "Dog";
            const string GoldFishSequenceName = "GoldFish";
            const string TrainingSequenceName = "Training";

            FtMeta meta = new FtMeta();

            // Add fields to Meta
            FtMetaField typeField = meta.FieldList.New(FtStandardDataType.Integer);
            typeField.Name = TypeFieldName;
            typeField.Id = TypeFieldId;
            FtMetaField nameField = meta.FieldList.New(FtStandardDataType.String);
            nameField.Name = NameFieldName;
            nameField.Id = NameFieldId;
            FtMetaField runningSpeedField = meta.FieldList.New(FtStandardDataType.Float);
            runningSpeedField.Name = RunningSpeedFieldName;
            runningSpeedField.Id = RunningSpeedFieldId;
            FtMetaField walkDistanceField = meta.FieldList.New(FtStandardDataType.Float);
            walkDistanceField.Name = WalkDistanceFieldName;
            walkDistanceField.Id = WalkDistanceFieldId;
            FtMetaField trainingField = meta.FieldList.New(FtStandardDataType.Boolean);
            trainingField.Name = TrainingFieldName;
            trainingField.Id = TrainingFieldId;
            FtMetaField trainerField = meta.FieldList.New(FtStandardDataType.String);
            trainerField.Name = TrainerFieldName;
            trainerField.Id = TrainerFieldId;
            FtMetaField sessionCostField = meta.FieldList.New(FtStandardDataType.Decimal);
            sessionCostField.Name = SessionCostFieldName;
            sessionCostField.Id = SessionCostFieldId;
            FtMetaField tankLocationField = meta.FieldList.New(FtStandardDataType.String);
            tankLocationField.Name = ColorFieldName;
            tankLocationField.Id = ColorFieldId;
            FtMetaField chineseClassificationField = meta.FieldList.New(FtStandardDataType.String);
            chineseClassificationField.Name = ChineseClassificationFieldName;
            chineseClassificationField.Id = ChineseClassificationFieldId;

            // Add Sequences to Meta
            FtMetaSequence rootSequence = meta.SequenceList.New();
            rootSequence.Name = RootSequenceName;
            rootSequence.Root = true;
            FtMetaSequence catSequence = meta.SequenceList.New();
            catSequence.Name = CatSequenceName;
            FtMetaSequence dogSequence = meta.SequenceList.New();
            dogSequence.Name = DogSequenceName;
            FtMetaSequence goldFishSequence = meta.SequenceList.New();
            goldFishSequence.Name = GoldFishSequenceName;
            FtMetaSequence trainingSequence = meta.SequenceList.New();
            trainingSequence.Name = TrainingSequenceName;

            // Add SequenceItems to Sequences.
            // Add SequenceItems with fields in correct order.  This way index does not need to be specified
            FtMetaSequenceItem item; // used for sequence items without redirects
            FtMetaSequenceItem typeSequenceItem = rootSequence.ItemList.New();
            typeSequenceItem.Field = typeField;
            item = rootSequence.ItemList.New();
            item.Field = nameField;
            item = catSequence.ItemList.New();
            item.Field = runningSpeedField;
            item = dogSequence.ItemList.New();
            item.Field = walkDistanceField;
            item = dogSequence.ItemList.New();
            item.Field = runningSpeedField;
            FtMetaSequenceItem trainingSequenceItem = dogSequence.ItemList.New();
            trainingSequenceItem.Field = trainingField;
            item = trainingSequence.ItemList.New();
            item.Field = trainerField;
            item = trainingSequence.ItemList.New();
            item.Field = sessionCostField;
            item = goldFishSequence.ItemList.New();
            item.Field = tankLocationField;
            item = goldFishSequence.ItemList.New();
            item.Field = chineseClassificationField;

            // Add redirects to Meta Sequence Items.
            FtExactIntegerMetaSequenceRedirect typeRedirect;
            typeRedirect = typeSequenceItem.RedirectList.New(FtStandardSequenceRedirectType.ExactInteger)
                           as FtExactIntegerMetaSequenceRedirect;
            typeRedirect.InvokationDelay = FtSequenceInvokationDelay.ftikAfterSequence;
            typeRedirect.Sequence = catSequence;
            typeRedirect.Value = 1;
            typeRedirect = typeSequenceItem.RedirectList.New(FtStandardSequenceRedirectType.ExactInteger)
                           as FtExactIntegerMetaSequenceRedirect;
            typeRedirect.InvokationDelay = FtSequenceInvokationDelay.ftikAfterSequence;
            typeRedirect.Sequence = dogSequence;
            typeRedirect.Value = 2;
            typeRedirect = typeSequenceItem.RedirectList.New(FtStandardSequenceRedirectType.ExactInteger)
                           as FtExactIntegerMetaSequenceRedirect;
            typeRedirect.InvokationDelay = FtSequenceInvokationDelay.ftikAfterSequence;
            typeRedirect.Sequence = goldFishSequence;
            typeRedirect.Value = 3;

            FtBooleanMetaSequenceRedirect trainingRedirect;
            trainingRedirect = trainingSequenceItem.RedirectList.New(FtStandardSequenceRedirectType.Boolean)
                               as FtBooleanMetaSequenceRedirect;
            trainingRedirect.InvokationDelay = FtSequenceInvokationDelay.ftikAfterField;
            trainingRedirect.Sequence = trainingSequence;
            trainingRedirect.Value = true;

            // Save Meta to file
            System.Xml.XmlWriterSettings writerSettings = new System.Xml.XmlWriterSettings();
            writerSettings.Indent = true;
            writerSettings.IndentChars = "  ";
            FtMetaSerializer.Serialize(meta, MetaFileName, writerSettings);
        }
    }
}
