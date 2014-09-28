$( document ).ready(function(){

    var dispatcher = new WebSocketRails('0.0.0.0:3000/websocket');

    dispatcher.on_open = function(data) {
        // console.log('Connection has been established: ', data);
        // You can trigger new server events inside this callback if you wish.
    };

    var chat = {

        init: function(){
            var _this = this;
            var $chat = $("#chat");
            if(!$chat.length) return;

            _this.connect_to_channel();
            _this.get_posts();

            $chat.delegate("#send", "click", function(){ _this.send_post(this) });
        },

        add_post_to_chat: function(post) {
            var element = "<div>" + post.text + "</div>";
            $("#chat").find("#history").append(element);
        },

        connect_to_channel: function() {
            channel = dispatcher.subscribe('posts');
            channel.bind('append_post', function(post) {
                chat.add_post_to_chat(post);
            });
        },

        get_posts: function() {
            var success = function(response) {
                $.each(response, function(index, post) {
                    chat.add_post_to_chat(post);
                });

            };

            var failure = function(response) { console.log('Failure on get posts') };

            dispatcher.trigger('get_posts', {}, success, failure);
        },

        get_new_post_text: function(){
            return $("#chat").find("#text").val();
        },

        send_post: function(button){
            var success = function(response) { };
            var failure = function(response) { console.log('Failure on send post') };

            var post = {
                text: this.get_new_post_text()
            };

            dispatcher.trigger('new_post', post, success, failure);
        }

    };

    chat.init();

});


