class PersonController < ApplicationController
  def upload_avatar
    current_user.avatar = params[:user][:avatar]
    current_user.save!
  end
end
