class ChatController < WebsocketRails::BaseController

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
      WebsocketRails[:posts].trigger 'append_post', post
    else
      trigger_failure  reason: 'the post is incorrect'
    end
  end

  def client_disconnected
    current_user.online = false
    current_user.save
  end

  def client_connected
    current_user.online = true
    current_user.save
  end

end