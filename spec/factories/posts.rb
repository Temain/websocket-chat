# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :post do
    text "Hi, my Lord!"
    association :user, factory: :user, strategy: :build
  end
end
