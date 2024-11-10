import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

def test_custom_nav_dropdown():
    driver = webdriver.Chrome()

    driver.get("http://localhost:5174") 
    
    try:
        about_button = driver.find_element(By.XPATH, "//span[contains(text(), 'About')]")
        actions = ActionChains(driver)
        actions.move_to_element(about_button).perform()  
        time.sleep(1)  

        dropdown = driver.find_element(By.ID, "about-dropdown")
        assert dropdown.is_displayed(), "Dropdown did not appear when hovering over 'About'"

        tech_stack_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Tech Stack')]")
        tech_stack_link.click()
        time.sleep(2)  
        assert driver.current_url == "http://localhost:3000/#tech-stack", "Tech Stack link navigation failed!"

        team_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Team')]")
        team_link.click()
        time.sleep(2) 
        assert driver.current_url == "http://localhost:3000/#team", "Team link navigation failed!"

    except AssertionError as e:
        print(f"Test failed: {e}")
    finally:
        driver.quit()

def test_navigation_bar():
    driver = webdriver.Chrome()

    driver.get("http://localhost:5174")
    
    try:
        home_button = driver.find_element(By.XPATH, "//div[contains(@class, 'navbar-link')]/p[contains(text(), 'IDC')]")
        home_button.click()
        time.sleep(2)  
        assert driver.current_url == "http://localhost:3000/", "Home page navigation failed!"

        visualization_button = driver.find_element(By.XPATH, "//span[contains(text(), 'Visualization')]")
        visualization_button.click()
        time.sleep(2)  
        assert driver.current_url == "http://localhost:3000/visualize", "Visualization page navigation failed!"
        
        forecast_button = driver.find_element(By.XPATH, "//span[contains(text(), 'Forecast')]")
        forecast_button.click()
        time.sleep(2)  
        assert driver.current_url == "http://localhost:3000/forecast", "Forecast page navigation failed!"

        dark_mode_toggle = driver.find_element(By.XPATH, "//label[contains(@class, 'switch')]/input")
        initial_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')

        dark_mode_toggle.click()
        time.sleep(1) 
        assert driver.find_element(By.TAG_NAME, 'body').get_attribute('class') != initial_class, "Dark mode toggle failed!"

        dark_mode_toggle.click()
        time.sleep(1)  
        assert driver.find_element(By.TAG_NAME, 'body').get_attribute('class') == initial_class, "Dark mode toggle failed!"
    
    except AssertionError as e:
        print(f"Test failed: {e}")
    finally:
        driver.quit()

if __name__ == "__main__":
    test_navigation_bar()
    test_custom_nav_dropdown()
