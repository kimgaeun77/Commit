<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Commit</title>
</head>
<body>

<script>
    alert('${msg}');
    opener.location.href='${path}';
    window.close();
</script>


</body>
</html>