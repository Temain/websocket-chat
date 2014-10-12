class PersonController < ApplicationController
  def upload_avatar
    current_user.avatar = params[:user][:avatar]
    if current_user.save
      flash[:success] = "Your avatar has been updated successfully."
    else
      flash[:warning] ||= current_user.errors[:file_size][0]
    end
    redirect_to controller: :main, action: :index
  end
end
