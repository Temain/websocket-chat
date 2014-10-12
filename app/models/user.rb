class User < ActiveRecord::Base
  attr_accessor :login

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  validates :username, :uniqueness => { :case_sensitive => false }
  validate :avatar_file_size

  mount_uploader :avatar, AvatarUploader

  has_many :posts

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions).where(["lower(username) = :value OR lower(email) = :value", { :value => login.downcase }]).first
    else
      where(conditions).first
    end
  end

  def avatar_file_size
    if avatar.file.size.to_f > 1024 * 100
      errors.add(:file_size, "You cannot upload a file greater than 100KB.")
    end
  end

end
