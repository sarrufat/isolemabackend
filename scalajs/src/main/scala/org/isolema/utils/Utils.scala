package org.isolema.utils
import scala.scalajs.js
import js.annotation._

@ScalaJSDefined
@JSExport("Utils")
object Utils  extends js.Object {
  
  def decomposeWordByOccur(word: String) = {
    val codeZip = word.zipWithIndex
    val result = for (cz <- codeZip) yield {
      if (word.drop(cz._2+1).contains(cz._1) || word.take(cz._2).contains(cz._1)) word.charAt(cz._2)
      else '_'
    }
    result.mkString
  }
}