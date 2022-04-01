import Controller from '@ember/controller';
import { task, timeout, waitForProperty } from 'ember-concurrency';

export default class ApplicationController extends Controller {
  @task encapsulatedTask = {
    *perform(value) {
      console.log('encapsulated waiting for 5 seconds');
      yield timeout(5000);
      console.log('encapsulated all done waiting');
      return 'all good';
    }
  }
  
  @task
  *printEncapsulatedTaskValue() {
    this.encapsulatedTask.perform();
    let value = yield waitForProperty(this.encapsulatedTask, 'last.value');
    console.log('encapsulated value: ', value);
  }

  @task
  *normalTask() {
    console.log('normal: waiting for 5 seconds');
    yield timeout(5000);
    console.log('normal: all done waiting');
    return 'all good';
  }
  
  @task
  *printNormalTaskValue() {
    this.normalTask.perform();
    let value = yield waitForProperty(this.normalTask, 'last.value');
    console.log('normal value: ', value);
  }
}
