package commit.etc.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Component;
// 비밀번호 찾기 서비스에서 임시 비밀번호를 메일로 전송해주는 클래스
@Component
public class Mail {

	@Autowired
	private MailSender mailSender;
	
	public void sendEmail(String toAddress, String fromAddress, String subject, String msgBody) {

		SimpleMailMessage smm = new SimpleMailMessage();
		smm.setTo(toAddress);
		smm.setFrom(fromAddress);
		smm.setSubject(subject);
		smm.setText(msgBody);
		
		mailSender.send(smm);
	}
}
