<?php
    $link = mysqli_connect('127.0.0.1', 'root', '123', 'newsuniver');
    if(mysqli_connect_errno())
    {
        echo 'Error connect db';
        exit();
    }
?>