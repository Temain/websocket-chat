require 'spec_helper'

describe Post do
  context "validates" do

    it "has a valid factory" do
      FactoryGirl.create(:post).should be_valid
    end

    it "should not be valid without text" do
      FactoryGirl.build(:post, text: nil).should_not be_valid
    end

    it "is not valid if length of text greater than 128 characters" do
      FactoryGirl.build(:post, text: "a" * 129).should_not be_valid
    end

  end
end
