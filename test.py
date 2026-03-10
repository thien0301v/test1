import unittest
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

class LoginTest(unittest.TestCase):

    def setUp(self):
        # Mở trình duyệt và truy cập trang login trước mỗi test case
        self.driver = webdriver.Chrome()
        self.driver.implicitly_wait(5)
        self.driver.get("https://the-internet.herokuapp.com/login")

    def tearDown(self):
        # Đóng trình duyệt sau mỗi test case
        self.driver.quit()

    def test_login_success(self):
        # Test case: Đăng nhập thành công với tài khoản đúng
        self.driver.find_element(By.ID, "username").send_keys("tomsmith")
        self.driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        time.sleep(2) # Chờ page load
        message = self.driver.find_element(By.ID, "flash").text
        self.assertIn("You logged into a secure area!", message, "Login test FAILED: Mức thông báo không đúng")

    def test_login_invalid_username(self):
        # Test case: Đăng nhập với username sai
        self.driver.find_element(By.ID, "username").send_keys("wrong_user")
        self.driver.find_element(By.ID, "password").send_keys("SuperSecretPassword!")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        time.sleep(2)
        message = self.driver.find_element(By.ID, "flash").text
        self.assertIn("Your username is invalid!", message, "Test FAILED: Không hiện lỗi sai username")

    def test_login_invalid_password(self):
        # Test case: Đăng nhập với password sai
        self.driver.find_element(By.ID, "username").send_keys("tomsmith")
        self.driver.find_element(By.ID, "password").send_keys("WrongPassword!")
        self.driver.find_element(By.CSS_SELECTOR, "button[type='submit']").click()
        
        time.sleep(2)
        message = self.driver.find_element(By.ID, "flash").text
        self.assertIn("Your password is invalid!", message, "Test FAILED: Không hiện lỗi sai password")

if __name__ == "__main__":
    unittest.main()