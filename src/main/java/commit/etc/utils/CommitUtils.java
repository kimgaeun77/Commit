package commit.etc.utils;

import org.apache.log4j.Logger;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.UUID;

// 사진 또는 파일의 임시 저장 이름을 랜덤 문자열로 생성해 주는 클래스
public class CommitUtils {
	private static final Logger log = Logger.getLogger(CommitUtils.class);
	
	public static String getRandomString(){
		return UUID.randomUUID().toString().replaceAll("-", "");
	}
}
