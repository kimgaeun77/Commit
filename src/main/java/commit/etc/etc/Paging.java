package commit.etc.etc;

import org.springframework.stereotype.Component;

import java.util.Map;

// map과 한 페이지당 보여줄 레코드 수를 파라미터로 받아 페이징 기능을 해주는 클래스
@Component
public class Paging {
    public Map<String, Object> calc(Map<String, Object> map, int recordCountPerPage) {

        //총 레코드 개수
        int totalRecord = Integer.parseInt(map.get("totalRecord").toString());
        //현재 페이지
        int currentPage = map.get("currentPage") == null ? 1 : Integer.parseInt(map.get("currentPage").toString());


        //전체 페이지 수
        int totalPage = totalRecord / recordCountPerPage + (totalRecord % recordCountPerPage == 0 ? 0 : 1);

        int startRow = 1 + (currentPage - 1) * recordCountPerPage;
        int endRow = currentPage * recordCountPerPage;

        // 마지막 레코드 번호가 전체 레코드 수보다 적으면
        if (totalRecord < endRow) {
            endRow = totalRecord;
        }

        // 이전 페이지 존재 여부
        boolean prev = currentPage - 5 >= 1;

        // 다음 페이지 존재 여부
        boolean next = ((currentPage - 1) / 5) < ((totalPage - 1) / 5);

        map.put("START_ROW", startRow);
        map.put("END_ROW", endRow);
        map.put("PREV", prev);
        map.put("NEXT", next);
        map.put("TOTALPAGE", totalPage);

        return map;
    }

}
