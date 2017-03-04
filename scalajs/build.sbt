

// Turn this project into a Scala.js project by importing these settings
enablePlugins(ScalaJSPlugin)

name := "IsolemaUtils"

version := "1.0.0"

scalaVersion := "2.12.1"

persistLauncher in Compile := false

persistLauncher in Test := false

testFrameworks += new TestFramework("utest.runner.Framework")

libraryDependencies ++= Seq(
    "org.scala-js" %%% "scalajs-dom" % "0.9.1",
    "com.lihaoyi" %%% "utest" % "0.4.5" % "test"
)


scalaJSModuleKind := ModuleKind.CommonJSModule