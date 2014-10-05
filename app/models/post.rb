class Post < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  belongs_to :user

  validates :text, presence: true, length: { maximum: 128 }

  scope :pure, -> { joins(:user).select(['text', 'created_at',
                                         'users.username', 'users.email', 'users.avatar']) }

  #def as_json(options = nil)
  #  super({ only: [:text, :created_at], include: :user }.merge(options || {}))
  #end

  def created_at_ago
    time_ago_in_words(created_at)
  end

  def as_json(options = nil)
    super((options || {}).merge({ :methods => [:created_at_ago] }))
  end

end
