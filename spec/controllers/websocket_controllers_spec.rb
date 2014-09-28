describe 'Websocket Controllers' do

  describe 'ChatController' do # as it is not a standard Rails Controller we have to use quotes

    it 'should trigger a success message on get_posts' do
      create_event('get_posts', nil).dispatch.should trigger_success_message
    end

    it 'should trigger a success message on new_post' do
      create_event('new_post',{ text: 'new post text' }).dispatch.should trigger_message
    end

    it 'should trigger a failure message on new_post' do
      create_event('new_post', { text: '' }).dispatch.should trigger_failure_message reason: 'the post is incorrect'
    end

  end

end