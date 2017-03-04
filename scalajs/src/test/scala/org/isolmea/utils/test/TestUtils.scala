package org.isolmea.utils.test

import org.isolema.utils._
import utest._

object TestUtils  extends TestSuite {
  
  def tests = TestSuite {
    'MapOrtographicAccent {
      assert(MapOrtographicAccent.mapWord("maratón") == "maraton")
    }
    'decomposeWordByOccur {
      println("----- " + Utils.decomposeWordByOccur("alastrar"))
      assert(Utils.decomposeWordByOccur("alastrar") == "a_a__rar")
      assert(Utils.decomposeWordByOccur("acalorar") == "a_a__rar")
      assert(Utils.decomposeWordByOccur("acalorar") ==  Utils.decomposeWordByOccur("alambrar"))
      assert(Utils.decomposeWordByOccur("estornudo") == "___o____o")
      assert(Utils.decomposeWordByOccur("cachondeo") == "c_c_o___o")
    }
  }
}