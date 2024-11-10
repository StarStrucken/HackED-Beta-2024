import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()), options=options)



def test_navigation_bar():
    driver = webdriver.Chrome(service=ChromeService(ChromeDriverManager().install()))
    driver.get("http://localhost:5174")
    
    try:
        # Wait until the 'IDC' button is present
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'navbar-link')]/p[contains(text(), 'IDC')]"))
        )
        
        # Test Home button
        home_button = driver.find_element(By.XPATH, "//div[contains(@class, 'navbar-link')]/p[contains(text(), 'IDC')]")
        home_button.click()
        time.sleep(2)
        assert driver.current_url == "http://localhost:3000/", "Home page navigation failed!"

        # Test Visualization button
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(text(), 'Visualization')]"))
        )
        visualization_button = driver.find_element(By.XPATH, "//p[contains(text(), 'Visualization')]")
        visualization_button.click()
        time.sleep(2)
        assert driver.current_url == "http://localhost:3000/visualize", "Visualization page navigation failed!"

        # Test Forecast button
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//p[contains(text(), 'Forecast')]"))
        )
        forecast_button = driver.find_element(By.XPATH, "//p[contains(text(), 'Forecast')]")
        forecast_button.click()
        time.sleep(2)
        assert driver.current_url == "http://localhost:3000/forecast", "Forecast page navigation failed!"

        # Test Dark Mode toggle
        dark_mode_toggle = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.XPATH, "//label[contains(@class, 'switch')]/input"))
        )
        body_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')

        # Toggle Dark Mode on
        dark_mode_toggle.click()
        time.sleep(1)
        new_body_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')
        assert 'dark-mode' in new_body_class, "Dark mode toggle on failed!"

        # Toggle Dark Mode off
        dark_mode_toggle.click()
        time.sleep(1)
        final_body_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')
        assert 'dark-mode' not in final_body_class, "Dark mode toggle off failed!"
    
    except AssertionError as e:
        print(f"Test failed: {e}")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    test_navigation_bar()
