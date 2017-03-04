package org.isolema.utils

import scala.scalajs.js
import js.annotation._

@ScalaJSDefined
@JSExport("scalaUtil")
object MapOrtographicAccent extends js.Object {
  val mapChar = Map('á' -> 'a', 'é' -> 'e', 'í' -> 'i', 'ó' -> 'o', 'ú' -> 'u')
 
  def mapWord(word: String) = word.map { ch =>
    mapChar get ch match {
      case Some(c) => c
      case None    => ch
    }
  }
}