package commit.estimate.service;

import java.util.List;
import java.util.Map;

public interface EstimateService {

	// 견적
	List<Map<String, Object>> getEstimateList() throws Exception;

}
