<?php
require 'db_config.php';
session_start();
if(isset($_SESSION['userid'])){
    $userid = $_SESSION['userid'];
    $sql = "SELECT u.* FROM friend_list f, users u where u.lastactivity > date_sub(now(), interval 1 minute) and f.friend_id=u.user_id and f.user_id = $userid"; 
    $result = $mysqli->query($sql);
    if(mysqli_num_rows($result) > 0 ){
        while($row = $result->fetch_assoc()){
            extract($row);
            $imgurl = "http://graph.facebook.com/$fb_id/picture?type=large";
            $encoded = base64_encode($user_id);
            echo "
            <li>
                        <a href='messages.php?id=$encoded' title='$first_name'>
                            <img src=$imgurl alt='user' class='img-responsive profile-photo' />
                            <span class='online-dot'></span>
                        </a>
                    </li>";
        }
    }
}


?>