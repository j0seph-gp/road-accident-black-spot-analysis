# 🚗 RoadGuard
## Dynamic Road Accident Black Spot Detection & Risk Monitoring System

### 📌 Project Overview

RoadGuard is a Big Data based road accident analysis system designed to identify candidate accident black spots and analyze accident patterns from a large-scale road accident dataset.

The system uses Hadoop HDFS, Hive and Apache Spark to store, process and analyze accident records. The processed results are presented through an interactive web dashboard with a geographical map.

---

## 🎯 Objectives

- Analyze a large-scale road accident dataset using Big Data technologies.
- Store accident data using Hadoop Distributed File System (HDFS).
- Use Hive for structured querying and data organization.
- Use Apache Spark for distributed data processing.
- Identify geographical locations with high accident concentration.
- Identify candidate accident black spots using a project-defined threshold.
- Analyze accident patterns based on time, road conditions, weather and other available factors.
- Present the results using an interactive web dashboard.

---

## 📊 Dataset

The project uses a large road accident dataset containing:

- **Total source records:** 1,048,575
- **Total columns:** 30
- **Valid records used for geographical analysis:** 59,998
- **Unique rounded geographical locations:** 48,043
- **Candidate black spots identified:** 527

### Dataset Format

CSV

### Important Dataset Fields

- Accident_Index
- longitude
- latitude
- Accident_Severity
- Number_of_Vehicles
- Number_of_Casualties
- Day_of_Week
- Time
- Road_Type
- Speed_limit
- Junction_Detail
- Junction_Control
- Light_Conditions
- Weather_Conditions
- Road_Surface_Conditions
- Urban_or_Rural_Area
- Date

---

## 🧹 Data Preprocessing

The original dataset contains 1,048,575 records.

For geographical black-spot analysis, records with missing latitude, longitude or accident severity were excluded from the analysis dataset.

This resulted in:

**59,998 valid accident records**

The original dataset is preserved separately, while the cleaned dataset is used for analysis.

---

## 📍 Black Spot Detection

Accident records were grouped according to rounded latitude and longitude values.

The geographical coordinates were rounded to three decimal places to create location zones.

A location was considered a **candidate black spot** when it contained:

**5 or more accident records**

This threshold is a project-defined criterion and is used to identify candidate high-accident-concentration locations.

Using this method, **527 candidate black spots** were identified.

---

## 🗺️ Interactive Map

The web dashboard displays all identified candidate black spots on an interactive map.

The map provides:

- Geographical location
- Latitude
- Longitude
- Number of accident records
- Marker clustering for easier visualization

Users can zoom, move around the map and select individual locations to view their accident-record information.

---

## ⚡ Big Data Architecture

```text
                Road Accident CSV Dataset
                         │
                         ▼
                 Hadoop HDFS
                         │
                         ▼
                       Hive
                         │
                         ▼
                 Apache Spark
                         │
          ┌──────────────┼──────────────┐
          ▼              ▼              ▼
     Data Cleaning   Location       Pattern
                     Analysis       Analysis
          │              │              │
          └──────────────┼──────────────┘
                         ▼
                  Analysis Results
                         │
                         ▼
                 Web Dashboard
