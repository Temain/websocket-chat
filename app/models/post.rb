class Post < ActiveRecord::Base
  include ActionView::Helpers::DateHelper

  belongs_to :user

  validates :text, presence: true, length: { maximum: 128 }

  scope :pure, -> { joins(:user).select(['text', 'created_at',
                                         'users.username', 'users.email']) }

  def created_at_ago
    time_ago_in_words(created_at)
  end

  def avatar_mini
    user.avatar.url
  end

  def as_json(options = nil)
    super((options || {}).merge({ only: [:text], methods: [:created_at_ago],
                                  include: { user: { only: [ :email, :username, :avatar] } } }))
  end

end
