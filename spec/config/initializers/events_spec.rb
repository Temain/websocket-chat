describe 'Event Mapping for WebsocketChat' do

  describe 'chat.get_posts' do
    it 'should be routed correctly' do
      create_event('get_posts', nil).should be_routed_only_to 'chat#get_posts'
    end
  end

  describe 'chat.new_post' do
    it 'should be routed correctly' do
      create_event('new_post', nil).should be_routed_only_to 'chat#new_post'
    end
  end

end