// const RubyProblem = require('./RubyProblem')
// const JSProblem = require('./JSProblem')

// let rubyProblems = [];

// for(let level = 1; level <= 5 ; level++){

//     for(let order = 1; order <= 20; order++){

//         rubyProblems.push(
//     new RubyProblem({
//             orderNumber: order,
//             level: level,
//             description: `${order}Write an 'Array#my_all?(&prc)' method. This method should return true if , every element in the array satisfies the block, otherwise return false. **Do NOT use 'Array#all?' in your implementation.**`,
//             initialCode: `class Array
//             def my_all?(&prc)

//         end
//         end`,
//             testCode: `
//         describe 'Array#my_all' do
//         let(:arr) { [1,2,3] }
        
//         before(:each) do
//             expect(arr).not_to receive(:all?)
//             expect(arr).not_to receive(:dup)
//         end

//         it "returns true if all elements match the block" do
//             expect(arr.my_all? { |num| num > 0 }).to eq(true)
//         end

//         it "returns false if not all elements match the block" do
//             expect(arr.my_all? { |num| num > 1 }).to eq(false)
//         end
//         end
//             `,
//             originalSolution: `class Array
//         def my_all?(&prc)
//             self.each { |el| return false unless prc.call(el) }
//             true
//         end
//         end
//             `,
//             inputOutput: ["`[1,2,3].my_all? { |n| n.even? }` => false", "`[2,4,6].my_all? { |n| n.even? }` => true"],
//             solutions: {}
//         })
//         ) 
// }
// }

// let jsProblems = [];

// for(let level = 1; level <= 5 ; level++){

//     for(let order = 1; order <= 20; order++){

//         jsProblems.push(
//              new JSProblem({
//                 solutions: {},
//                 orderNumber: order,
//                 level: level,
//                 description: `${order}Write a function, 'factors(num)', that returns an array containing the factors`,
//                 originalSolution: `function factors(num) {
//                     // Generates an array of numbers from 1 up to num
//             const facts = Array.from(Array(num)).map( (el, idx) => idx + 1);
//             // Filter array for only those numbers which are factors
//             return facts.filter(el => num % el === 0);
//             };`,
//             initialCode: `function factors(num) {
//                         }`,
//             inputOutput: ["`[1,2,3].my_all? { |n| n.even? }` => false", "`[2,4,6].my_all? { |n| n.even? }` => true"],
//             testCode: `describe("factors", () => {
//             it("returns the factors of a number in ascending order", () => {
//                 expect(factors(10)).toEqual([1, 2, 5, 10]);
//                 expect(factors(21)).toEqual([1, 3, 7, 21]);
//             });

//             it("should handle 1 correctly", () => {
//                 expect(factors(1)).toEqual([1]);
//                 });
//             });`
//             })
//         ) 
// }
// }


// rubyProblems.forEach(element => {
//     element.save()
// });

// jsProblems.forEach(element => {
//     element.save()
// });

// // // ruby21 = new RubyProblem({
// // //     solutions: {},
// // //     orderNumber: 1,
// // //     level: 2,
// // //     description: `Write a method, 'digital_root(num)'. It should Sum the digits of a positive integer. If it is greater than 9 (i.e. more than one digit), sum the digits of the resulting number. Keep repeating until there is only one digit in the result, called the "digital root". 
// // // **Do NOT use the built in 'Integer#to_s' or 'Integer#digits' methods in your implementation.**`,
// // //     initialCode: `def digital_root(num)

// // // end`,
// // //     testCode: `describe "#digital_root" do
// // //   before(:each) do
// // //     expect_any_instance_of(Integer).to_not receive(:to_s)
// // //     expect_any_instance_of(Integer).to_not receive(:digits)
// // //   end
  
// // //   it "calculates the digital root of a single-digit number" do
// // //     expect(digital_root(9)).to eq(9)
// // //   end

// // //   it "calculates the digital root of a multi-digit number" do
// // //     expect(digital_root(125)).to eq(8)
// // //   end
  
// // //   it "calculates the digital root of a larger number" do
// // //     expect(digital_root(4322)).to eq(2)
// // //   end
// // // end `,
// // //     originalSolution: `def digital_root(num)
// // //   while num >= 10
// // //     num = digital_root_step(num)
// // //   end

// // //   num
// // // end

// // // def digital_root_step(num)
// // //   root = 0
// // //   while num > 0
// // //     root += (num % 10)

// // //     num /= 10
// // //   end

// // //   root
// // // end
// // //     `,
// // //     inputOutput: ["digital_root(9) => 9", "(digital_root(125) => 8", "(digital_root(4322) => 2"]
// // // })

// // // ruby22 = new RubyProblem({
// // //     solutions: {},
// // //     orderNumber: 2,
// // //     level: 2,
// // //     description: `Define a method 'rec_sum(nums)' that returns the sum of all elements in an array recursively`,
// // //     initialCode: `def rec_sum(nums)

// // // end`,
// // //     testCode: `describe "#rec_sum" do
// // //   it "returns the sum of all elements in an array" do
// // //     arr = [1,2,3,4]
// // //     expect(rec_sum(arr)).to eq(10)
// // //   end

// // //   it "returns the sum of all elements in an array" do
// // //     expect(rec_sum([-6, 6, 5, 4])).to eq(9)
// // //   end
  
// // //   it "returns 0 if the array is empty" do
// // //     expect(rec_sum([])).to eq(0)
// // //   end

// // //   it "calls itself recursively" do
// // //     expect(self).to receive(:rec_sum).exactly(4).times.and_call_original
// // //     rec_sum([1,2,3])
// // //   end
// // // end`,
// // //     originalSolution: `def rec_sum(nums)
// // //   return 0 if nums.empty?
  
// // //   nums[0] + rec_sum(nums.drop(1))
// // // end
// // //     `,
// // // inputOutput: ["Given [1,2,3,4], (rec_sum(arr) => 10", "Given [- 6, 6, 5, 4], (rec_sum(arr) => 9"]
// // // })

// // // ruby2 = new RubyProblem ({
// // //     solutions: {},
// // //     orderNumber: 2,
// // //     level: 1,
// // //     description: `Write a method that returns the factors of a number in ascending order.`,
// // //     initialCode: `def factors(num)
    
// // // end`,
// // // testCode: `
// // // describe "#factors" do
// // // it "returns the factors of 10 in order" do
// // // expect(factors(10)).to eq([1, 2, 5, 10])
// // // end

// // // it "returns just two factors for primes" do
// // // expect(factors(13)).to eq([1, 13])
// // // end

// // // it "returns nil for numbers less than zero" do
// // //     expect(factors(-5)).to eq(nil)
// // //     end
    
// // //     it "returns [1] when finding factors of 1" do
// // //     expect(factors(1)).to eq([1])
// // //     end
// // //     end
// // //     `,
// // //     originalSolution: `def factors(num)
// // //     return nil if num <= 0
// // //     return [1] if num == 0
// // //     (1..num).select { |i| (num % i) == 0 }
// // //     end
// // //     `
// // // })

// // // ruby3 = new RubyProblem({
// // //     solutions: {},
// // //     orderNumber: 3,
// // //     level: 1,
// // //     description: `# Write an "Array#median" method that returns the median element in an array.
// // // # If the length is even, return the average of the middle two elements.
// // //     `,
// // //     initialCode: `class Array
// // //         def median

// // //         end
// // //     end`,
// // //     testCode: `
// // //     describe "Array#median" do
// // //   let(:even_array) { [3, 2, 6, 7] }
// // //   let(:odd_array) { [3, 2, 6, 7, 1] }

// // //   it "returns nil for the empty array" do
// // //     expect([].median).to be_nil
// // //   end

// // //   it "returns the element for an array of length 1" do
// // //     expect([1].median).to eq(1)
// // //   end

// // //   it "returns the median of an odd-length array" do
// // //     expect(odd_array.median).to eq(3)
// // //   end

// // //   it "returns the median of an even-length array" do
// // //     expect(even_array.median).to eq(4.5)
// // //   end
// // // end
// // //     `,
// // //     originalSolution: `class Array
// // //       def median
// // //     return nil if empty?
// // //     sorted = self.sort
// // //     if length.odd?
// // //       sorted[length / 2]
// // //     else
// // //       (sorted[length / 2] + sorted[length / 2 - 1]).fdiv(2)
// // //     end
// // //   end  
// // // end
// // //     `
// // // })


// // // ruby31 = new RubyProblem({
// // //     solutions: {},
// // //     orderNumber: 1,
// // //     level: 3,
// // //     description: ` Write a monkey patch of binary search: 
// // // **Do NOT use the built in 'Array#index' 'Array#find_index', 'Array#include?', or 'Array#member' methods in your implementation.**`,
// // //     initialCode: `class Array
// // //   def my_bsearch(target)
    
// // //   end
// // // end,
// // //     testCode: `describe 'Array#my_bsearch' do
// // //   let(:arr) { [11, 22, 33, 44, 66] }

// // //   disallowed_methods = [
// // //     :index, :find_index, :include?, :member?, :dup
// // //   ]

// // //   before(:each) do
// // //     disallowed_methods.each do |method|
// // //       expect(arr).not_to receive(method)
// // //     end
// // //     expect_any_instance_of(Array).not_to receive(:index)
// // //   end

// // //   it "returns nil if the array is empty" do
// // //     expect([].my_bsearch(11)).to be_nil
// // //   end

// // //   it "returns the index of a target" do
// // //     expect(arr.my_bsearch(33)).to eq(2)
// // //   end

// // //   it "returns the index of a target that's less than the midpoint" do
// // //     expect(arr.my_bsearch(22)).to eq(1)
// // //   end

// // //   it "returns the index of a target that's greater than the midpoint" do
// // //     expect(arr.my_bsearch(66)).to eq(4)
// // //   end

// // //   it "returns nil if the target isn't found" do
// // //     expect(arr.my_bsearch(5)).to be_nil
// // //   end
// // // end`,
// // //     originalSolution: `class Array
// // //   def my_bsearch(target)
// // //     return nil if size == 0
// // //     mid = size/2

// // //     case self[mid] <=> target
// // //     when 0
// // //       return mid
// // //     when 1
// // //       return self.take(mid).my_bsearch(target)
// // //     else
// // //       search_res = self.drop(mid+1).my_bsearch(target)
// // //       search_res.nil? ? nil : mid + 1 + search_res
// // //     end
// // //   end
// // // end
// // //     `,
// // //     inputOutput: ["E.g. [1, 2, 3, 4, 5, 7].my_bsearch(5) => 4"]
// // // })

// // // ruby32 = new RubyProblem({
// // //     solutions: {},
// // //     orderNumber: 2,
// // //     level: 3,
// // //     description: ` Write a recursive method that returns the first "num" factorial numbers in ascending order. Note that the 1st factorial number is 0!, which equals 1. The 2nd factorial is 1!, the 3rd factorial is 2!, etc.`,
// // //     initialCode: `def factorials_rec(num)
  
// // // end`,
// // //     testCode: `describe "#factorials_rec" do
// // //   it "returns first factorial number" do
// // //     expect(factorials_rec(1)).to eq([1])
// // //   end

// // //   it "returns first two factorial numbers" do
// // //     expect(factorials_rec(2)).to eq([1, 1])
// // //   end

// // //   it "returns many factorials numbers" do
// // //     expect(factorials_rec(6)).to eq([1, 1, 2, 6, 24, 120])
// // //   end

// // //   it "calls itself recursively" do
// // //     expect(self).to receive(:factorials_rec).at_least(:twice).and_call_original
// // //     factorials_rec(6)
// // //   end
// // // end`,
// // //     originalSolution: `def factorials_rec(num)
// // //   return [1] if num == 1
// // //   facs = factorials_rec(num - 1)
// // //   facs << facs.last * (num - 1)
// // //   facs
// // // end
// // //     `,
// // //     inputOutput: ["factorials_rec(6) => [1, 1, 2, 6, 24, 120]", "factorials_rec(2) => [1, 1]", "factorials_rec(1) => [1]"]
// // // })

// // // //////////////////////////////////////////////////////////////////////
// // // //////////////////////////////////////////////////////////////////////


// // // js1 = new JSProblem({
// // //     solutions: {},
// // //     orderNumber: 1,
// // //     level: 1,
// // //     description: `Write a function, 'factors(num)', that returns an array containing the factors`,
// // //     originalSolution: `function factors(num) {
// // //         // Generates an array of numbers from 1 up to num
// // //   const facts = Array.from(Array(num)).map( (el, idx) => idx + 1);
// // //   // Filter array for only those numbers which are factors
// // //   return facts.filter(el => num % el === 0);
// // // };`,
// // // testCode: `describe("factors", () => {
// // //   it("returns the factors of a number in ascending order", () => {
// // //       expect(factors(10)).toEqual([1, 2, 5, 10]);
// // //     expect(factors(21)).toEqual([1, 3, 7, 21]);
// // // });

// // //   it("should handle 1 correctly", () => {
// // //       expect(factors(1)).toEqual([1]);
// // //     });
// // // });`
// // // })

// // // js2 = new JSProblem({
// // //     solutions: {},
// // //     orderNumber: 2,
// // //     level: 1,
// // //     description: `Write an 'Array.prototype.median' method that returns the median of elements in an array. If the length is even, return the average of the middle two elements.`,
// // //     originalSolution: `Array.prototype.median = function () {
// // //           if (!this.length) return null;
// // //           const sorted = this.sort();
// // //           const mid = Math.floor(this.length / 2);
        
// // //           if (this.length % 2 !== 0) {
// // //             return sorted[mid];
// // //           } else {
// // //             return (sorted[mid] + sorted[mid - 1]) / 2;
// // //           }
// // //         };`,
// // //     testCode: `describe("Array.prototype.median", () => {
// // //           it("returns null for the empty array", () => {
// // //             expect([].median()).toBe(null);
// // //           });
        
// // //           it("returns the element for an array of length 1", () => {
// // //             expect([1].median()).toEqual(1);
// // //           });
        
// // //           it("returns the median of an odd-length array", () => {
// // //             expect([3, 2, 6, 7, 1].median()).toEqual(3);
// // //           });
        
// // //           it("returns the median of an even-length array", () => {
// // //             expect([3, 2, 6, 7].median()).toEqual(4.5);
// // //           });
// // //         });`
// // // })

// // // js3 = new JSProblem(
// // //     {
// // //         solutions: {},
// // //         orderNumber: 3,
// // //         level: 1,
// // //         description: `Write a function, 'doubler(arr)', that returns a copy of the input array with all elements doubled. You do not need to worry about invalid input.`,
// // //         originalSolution: `function doubler(array) {
// // //   return array.map(el => el * 2);
// // // }`,
// // //         inputOutput: ["doubler([1, 2, 3]) => [2, 4, 6]"],
// // //         testCode: `
// // //         describe("doubler", () => {
// // //   let array;

// // //   beforeEach(() => {
// // //     array = [1, 2, 3]
// // //   });

// // //   it("doubles the elements of the array", () => {
// // //     expect(doubler(array)).toEqual([2, 4, 6]);
// // //   });

// // //   it("does not modify the original array", () => {
// // //     const dupArray = array.slice(0);
// // //     doubler(array);

// // //     expect(array).toEqual(dupArray);
// // //   });
// // // });
// // //     `
// // //     },
// // // )

// // // ruby1.save(); ruby2.save(); ruby21.save(); ruby22.save(); ruby3.save(); ruby31.save(); ruby32.save();
// // // js1.save(); js2.save(); js3.save();