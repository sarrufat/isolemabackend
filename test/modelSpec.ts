
import { suite, test, slow, timeout, skip, only } from "mocha-typescript";
import { expect } from 'chai';
import * as testmodel from '../src/model/IWord';

@suite("ModelSpec")
class ModelSpec {
    @test("getWordById should pass")
    assert_pass_async_getWordById(done: Function) {
      testmodel.getWordById('58a5bd24bbe1c24472157e78', (word: testmodel.IWord) => {
        expect(word.word).to.equal('aceituna');
        done();
      });
    }
    @test("getWordLike should pass")
    assert_pass_async_getWordLike(done: Function) {
      testmodel.getWordLike('mapa',  (words: [testmodel.IWord]) => {
        expect(words).to.have.lengthOf(5);
        done();
      });
    }
}
