class ChatController < WebsocketRails::BaseController

  after_filter :update_online_list, only: [ :client_connected, :client_disconnected ]

  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def get_posts
    posts = Post.last(50)
    trigger_success posts
  end

  def new_post
    post = Post.new(text: message["text"])
    post.user = current_user
    if post.save
      WebsocketRails[:posts].trigger "append_post", post
    else
      trigger_failure  reason: "the post is incorrect"
    end
  end

  def online_users
    trigger_success User.online
  end

  def client_disconnected
    current_user.online = false
    current_user.save
  end

  def client_connected
    current_user.online = true
    current_user.save
  end


  private

  def update_online_list
    WebsocketRails[:posts].trigger "update_online_list", User.online
  end

end