$( document ).ready(function(){

    var dispatcher = new WebSocketRails('0.0.0.0:3000/websocket');

    var chat = {

        init: function(){
            var _this = this;
            var $chat = $("#chat");
            if(!$chat.length) return;

            _this.connect_to_channel();
            _this.get_posts();
            _this.get_online_list();

            $chat.delegate("#send", "click", function(){ _this.send_post(this) });
        },

        add_post_to_chat: function(post) {
            var avatar_uri = (post.user.avatar == null) ? "/assets/default_avatar.png" : post.user.avatar.mini.url;
            var avatar = "<img class='avatar-mini' height='50' width='50' src='" + avatar_uri + "' >";
            var user = "<span class='username'>" + post.user.username + "</span>";
            var datetime = "<span class='datetime'>" + post.created_at_ago + " ago</span>";
            var head = "<div class='head'>" + user + datetime + "</div>";
            var text = "<div class='text'>" + post.text + "</div>";
            var message = "<div class='message'>" + head + text + "</div>";
            var element = "<div class='post'>" + avatar + message + "</div>";
            $("#chat").find("#history").append(element);
        },

        connect_to_channel: function() {
            var channel = dispatcher.subscribe('posts');
            channel.bind('append_post', function(post) {
                chat.add_post_to_chat(post);
            });

            channel.bind('update_online_list', function(users) {
                alert("dfgd");
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

        get_online_list: function() {
            var success = function(users) {
                $("#users_count").text(users.length);
                $.each(users, function(index, user) {
                    var avatar_uri = (user.avatar == null) ? "/assets/default_avatar.png" : user.avatar.mini.url;
                    $("#users_list").append("<img class='avatar-mini' height='50' width='50' src='" + avatar_uri + "' >");
                });
            };

            var failure = function(response) { console.log('Failure on update online list') };

            dispatcher.trigger('online_users', {}, success, failure);
        },

        get_new_post_text: function(){
            return $("#chat").find("#text").val();
        },

        clear_new_post_text: function(){
            $("#chat").find("#text").val("");
        },

        send_post: function(button){
            var success = function(response) { };
            var failure = function(response) { console.log('Failure on send post') };

            var post = {
                text: this.get_new_post_text()
            };

            dispatcher.trigger('new_post', post, success, failure);
            this.clear_new_post_text();
        }

    };

    chat.init();
    person.init();
});


