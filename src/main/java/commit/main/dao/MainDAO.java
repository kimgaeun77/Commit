package commit.main.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository("mainDAO")
public class MainDAO extends AbstractDAO {

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> selectGamingPC() {

        return selectList("main.selectGamePC");
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, Object>> selectOfficePC() {
        return selectList("main.selectOfficePC");
    }

}
