package commit.main.service;

import commit.main.dao.MainDAO;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service("mainService")
public class MainServiceImpl implements MainService {
	
	Logger log = Logger.getLogger(this.getClass());

	@Autowired
	private MainDAO mainDAO;

	@Override
	public Map<String, Object> getBestPC() throws Exception {
	
		
		List<Map<String,Object>> gamingPC =  mainDAO.selectGamingPC();
		List<Map<String,Object>> officePC = mainDAO.selectOfficePC();
		
		Map<String,Object> bestPCList = new HashMap<>();
		
		bestPCList.put("gamingPC", gamingPC);
		bestPCList.put("officePC", officePC);

		return bestPCList;
	}
	
}
