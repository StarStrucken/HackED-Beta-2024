import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.action_chains import ActionChains

def test_custom_nav_dropdown():
    # Setup WebDriver (Assuming ChromeDriver is installed and in PATH)
    driver = webdriver.Chrome()

    # Open the app in a test browser
    driver.get("http://localhost:3000")  # Adjust URL if necessary
    
    try:
        # Test: Hover over the 'About' dropdown to make it visible
        about_button = driver.find_element(By.XPATH, "//span[contains(text(), 'About')]")
        actions = ActionChains(driver)
        actions.move_to_element(about_button).perform()  # Hover over the 'About' link
        time.sleep(1)  # Wait for the dropdown to appear

        # Assert the dropdown menu is visible
        dropdown = driver.find_element(By.ID, "about-dropdown")
        assert dropdown.is_displayed(), "Dropdown did not appear when hovering over 'About'"

        # Test: Click on the 'Tech Stack' link in the dropdown
        tech_stack_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Tech Stack')]")
        tech_stack_link.click()
        time.sleep(2)  # Wait for the navigation or action to happen
        assert driver.current_url == "http://localhost:3000/#tech-stack", "Tech Stack link navigation failed!"

        # Test: Click on the 'Team' link in the dropdown
        team_link = driver.find_element(By.XPATH, "//a[contains(text(), 'Team')]")
        team_link.click()
        time.sleep(2)  # Wait for the navigation or action to happen
        assert driver.current_url == "http://localhost:3000/#team", "Team link navigation failed!"

    except AssertionError as e:
        print(f"Test failed: {e}")
    finally:
        # Cleanup: Close the browser after the test
        driver.quit()

def test_navigation_bar():
    # Setup WebDriver (Assuming ChromeDriver is installed and in PATH)
    driver = webdriver.Chrome()

    # Open the app in a test browser
    driver.get("http://localhost:5174")  # Adjust URL if necessary
    
    try:
        # Test: Check if the 'Home' link navigates to the home page
        home_button = driver.find_element(By.XPATH, "//div[contains(@class, 'navbar-link')]/p[contains(text(), 'IDC')]")
        home_button.click()
        time.sleep(2)  # Wait for the page to load
        assert driver.current_url == "http://localhost:3000/", "Home page navigation failed!"

        # Test: Check if 'Visualization' link navigates to the visualization page
        visualization_button = driver.find_element(By.XPATH, "//span[contains(text(), 'Visualization')]")
        visualization_button.click()
        time.sleep(2)  # Wait for the page to load
        assert driver.current_url == "http://localhost:3000/visualize", "Visualization page navigation failed!"
        
        # Test: Check if 'Forecast' link navigates to the forecast page
        forecast_button = driver.find_element(By.XPATH, "//span[contains(text(), 'Forecast')]")
        forecast_button.click()
        time.sleep(2)  # Wait for the page to load
        assert driver.current_url == "http://localhost:3000/forecast", "Forecast page navigation failed!"

        # Test: Check if Dark Mode toggle works
        dark_mode_toggle = driver.find_element(By.XPATH, "//label[contains(@class, 'switch')]/input")
        initial_class = driver.find_element(By.TAG_NAME, 'body').get_attribute('class')

        # Toggle dark mode on
        dark_mode_toggle.click()
        time.sleep(1)  # Wait for the page to update
        assert driver.find_element(By.TAG_NAME, 'body').get_attribute('class') != initial_class, "Dark mode toggle failed!"

        # Toggle dark mode off
        dark_mode_toggle.click()
        time.sleep(1)  # Wait for the page to update
        assert driver.find_element(By.TAG_NAME, 'body').get_attribute('class') == initial_class, "Dark mode toggle failed!"
    
    except AssertionError as e:
        print(f"Test failed: {e}")
    finally:
        # Cleanup: Close the browser after the test
        driver.quit()

if __name__ == "__main__":
    test_navigation_bar()
    test_custom_nav_dropdown()
