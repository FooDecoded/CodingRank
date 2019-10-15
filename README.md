# CodeRank

CodeRank is a platform that helps users practice for their technical interviews and combines the main and most useful features from existing code-practice/training platforms.
CodeRank aslo provides an interviewing platform through which recruiters can assess potential hires, with access to users' profiles. User profiles contain information on a user's progress in their 
specific languages, and the points they have accrued through past competitions.

## Features

![Screen Shot 2019-09-27 at 2 20 36 PM](https://user-images.githubusercontent.com/22735463/65803673-2497fc00-e134-11e9-84d0-866d10ca917f.png)

### Training
* Users have a profile where their progress is in all laguages (currently only JS and Ruby avaialble) is tracked and displayed in a clean and easy to read UI.
* Practice exercises are available based on user's level or

### Competition
* A weekly competition is scheduled to run in a pre-set language with a set number of problems. Users can participate 
* Rank is determined based on two things: 1).  Solution, 2). Time/speed.

## Building CodeRank

### Testing Suites and Response Evaluation
* Using Jasmine and RSpec to parse failures and passes and return them to the user following the code below: 

```javascript

var myReporter = {
    passes: [],
    failures: [],

    specDone: function(result) {
        if(result.status == "passed"){
            // console.log('Spec: ' + result.description + ' was ' + result.status);
            this.passes.push(result.description)
        } else {
            this.failures.push([result.description,result.failedExpectations[0].message])
        }
    },
  jasmineDone: function() {
      console.log(JSON.stringify({ passes: this.passes, failures: this.failures }))
    }
}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(myReporter);
```

#### Future Improvements:
* Currently, we can only support Ruby and Javascript as the main languages for training. In the future we may be able to incorporate testing frameworks like Mamba, Expects, and JUnit for Python and Java. 

![coderank_screenshot2](https://user-images.githubusercontent.com/22735463/65803912-f4049200-e134-11e9-8070-a4619af79e32.png)

### Integrating the Code Editor 
* CodeRank uses [CodeMirror](https://codemirror.net/), a text editor iplemented in Javascript for the browser, to contain user input.

#### Future Improvements:
* A feature we will expand on in the current project is the interviewing functionality: adding a video chat option and distinguishing interviewer profiles from programmer/learner profiles. 

## Currently in Development: 
* The UI is currently being reworked for responsiveness. 


## Credits & Acknowledgements
* TBD
