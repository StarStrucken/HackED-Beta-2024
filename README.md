# **HackEd Beta 2024 Project: myFinanceForecaster**
## * Forked from original repo from our team *

This project is a sophisticated full-stack web application designed to forecast stock or economic data trends, offering users real-time visual insights into projected metrics. It leverages a comprehensive technology stack to support backend processing, model training, interactive data visualization, and automated testing. Altogether, this stack provides a robust framework for handling data-driven forecasts, efficient processing of time-series data, and creating a polished, user-friendly interface with accurate data visualizations. Each technology contributes to a highly interactive and reliable forecasting tool for users interested in stock and economic trends.

### Back-end:

- Flask: Acts as the primary framework for developing the REST API, enabling smooth communication between the frontend and backend. Flask routes manage incoming requests, trigger forecasting model predictions, and serve data to the front-end.
- TensorFlow (LSTM Model): TensorFlow powers an LSTM (Long Short-Term Memory) neural network model, which is trained for time series forecasting. LSTM is ideal for handling sequential data, making it well-suited for predicting stock prices and other time-dependent economic indicators. This model processes historical data to generate forecasts, which are then sent to the front-end for visualization.
- NumPy: Supports efficient numerical computations, especially matrix operations and data handling. In this project, NumPy is essential for preprocessing data fed into the LSTM model and ensuring optimal performance.
- Matplotlib: Provides additional options for static data visualization and analysis in the backend. Matplotlib is also used to create diagnostic plots during model development and evaluation, aiding in the understanding of model accuracy and performance.


### Front-end:

- React.js: Forms the foundation of the application’s user interface, providing a modular and efficient approach to building interactive components. The dynamic interface built with React allows users to select various stock or economic metrics and view the corresponding forecast data.
- Chart.js: Integrates seamlessly with React to create visually appealing, interactive graphs for displaying forecast results. Chart.js enables users to toggle between different datasets and indicators, with responsive chart components that automatically adjust based on the selected data.


### Testing:

- Selenium: Automates UI testing for the frontend, validating user flows and ensuring that all application features perform as expected. Selenium scripts simulate user actions, such as navigating between different data visualizations, verifying that forecast data updates correctly, and testing different ticker selections, helping to maintain a smooth user experience.


### Version Control:

- Git: Manages the version control of the project, enabling efficient collaboration, tracking code changes, and managing various feature branches. Git is essential for maintaining the integrity of the codebase, allowing for easy rollbacks, code reviews, and organized development across team members.
