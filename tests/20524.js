
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

describe("factors", () => {
            it("returns the factors of a number in ascending order", () => {
                expect(factors(10)).toEqual([1, 2, 5, 10]);
                expect(factors(21)).toEqual([1, 3, 7, 21]);
            });

            it("should handle 1 correctly", () => {
                expect(factors(1)).toEqual([1]);
                });
            });