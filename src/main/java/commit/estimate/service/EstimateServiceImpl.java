package commit.estimate.service;

import commit.estimate.dao.EstimateDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service()
public class EstimateServiceImpl implements EstimateService {

	Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private EstimateDAO estimateDAO;

	// 견적을 위한 stuff 리스트
	@Override
	public List<Map<String, Object>> getEstimateList() throws Exception {
		return estimateDAO.selectEstimateList();
	}

}