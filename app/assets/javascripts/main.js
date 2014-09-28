$( document ).ready(function(){

    var dispatcher = new WebSocketRails('0.0.0.0:3000/websocket');

    dispatcher.on_open = function(data) {
        console.log('Connection has been established: ', data);
        // You can trigger new server events inside this callback if you wish.
    };

    var chat = {

        init: function(){
            var _this = this;
            var $chat = $("#chat");
            if(!$chat.length) return;

            _this.connect_to_channel();
            _this.get_posts();

            $chat.delegate("#send", "click", function(){ _this.send_message(this) });
        },

        connect_to_channel: function() {
            channel = dispatcher.subscribe('posts');
            channel.bind('new_post', function(post) {
                console.log('a new post about ' + post.body + ' arrived!');
            });
        },

        get_posts: function() {
            var success = function(response) {
                console.log("Success");
                console.log(response);
                //var element = "<div>" + response.text + "</div>";
                //$("#chat").find("#history").append(element);
            };

            var failure = function(response) {
                console.log('Failure');
            };

            dispatcher.trigger('get_posts', {}, success, failure);
        },

        get_new_post_text: function(){
            return $("#chat").find("#text").val();
        },

        send_message: function(button){
            var success = function(response) { console.log('Success') };
            var failure = function(response) { console.log('Failure') };

            var post = {
                text: this.get_new_post_text()
            };

            dispatcher.trigger('new_post', message, success, failure);
        }

    };

    chat.init();

});


