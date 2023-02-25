package commit.member.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.Map;

@Repository
public class MemberDAO extends AbstractDAO {

    @SuppressWarnings("unchecked")
    public Map<String, Object> selectMemberDetail(Map<String, Object> map) throws Exception {
        return (Map<String, Object>) selectOne("member.selectMemberDetail", map);
    }

    public int confirmId(Map<String, Object> map) {
        return (Integer) selectOne("member.confirmId", map);
    }

    public int confirmEmail(Map<String, Object> map) {
        return (Integer) selectOne("member.confirmEmail", map);
    }

    public void insertMember(Map<String, Object> map) {
        insert("member.insertMember", map);

    }
	public int selectMemberByInfo(Map<String, Object> map) {
		return (Integer) selectOne("member.selectMemberByInfo", map);
	}

    public String findID(Map<String, Object> map) {
        return (String) selectOne("member.findID", map);
    }

    public void updateTempPW(Map<String, Object> map) {
        update("member.updateTempPW", map);
    }

}
