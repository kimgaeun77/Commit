package commit.estimate.dao;

import commit.etc.dao.AbstractDAO;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class EstimateDAO extends AbstractDAO {

	// 견적
	@SuppressWarnings("unchecked")
	public List<Map<String, Object>> selectEstimateList() {
		return (List<Map<String, Object>>) selectList("estimate.selectEstimateList");
	}

}