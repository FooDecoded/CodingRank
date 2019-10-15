beginclass Array
            def my_all?(&prc)

        end
        enrescue print 'You have a Run-time Error' end
        describe 'Array#my_all' do
        let(:arr) { [1,2,3] }
        
        before(:each) do
            expect(arr).not_to receive(:all?)
            expect(arr).not_to receive(:dup)
        end

        it "returns true if all elements match the block" do
            expect(arr.my_all? { |num| num > 0 }).to eq(true)
        end

        it "returns false if not all elements match the block" do
            expect(arr.my_all? { |num| num > 1 }).to eq(false)
        end
        end
            