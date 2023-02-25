package commit.oauth.model;

import lombok.Getter;


@Getter
public class KakaoUserInfo {

    private Long id;
    private String connected_at;
    private Properties properties;
    private KakaoAccount kakao_account;

}
