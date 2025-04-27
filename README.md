English (US) | [Português (BR)](./README.pt-BR.md)

# Célere Web Vitals

![Dynamic JSON Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fapi.github.com%2Frepos%2Fcelere-dev%2Fcelere-web-vitals%2Factions%2Fworkflows%2F128475555%2Fruns%3Fstatus%3Dcompleted%26per_page%3D1&query=%24.workflow_runs%5B0%5D.run_started_at&style=flat-square&label=last%20email%20sent&color=%232f0b48&link=https%3A%2F%2Fgithub.com%2Fcelere-dev%2Fcelere-web-vitals%2Factions)

Deno-based application that generates a Lighthouse report and sends it as plain text via email using the Resend API through GitHub Actions.

The application evaluates Core Web Vitals in a customized manner, considering that no interactivity test is performed during report generation. It runs Lighthouse in its default navigation mode, simulating a user-free environment.

Three metrics are used to calculate the Core Web Vitals: Largest Contentful Paint (LCP), Cumulative Layout Shift (CLS), and Total Blocking Time (TBT), which [replaces](https://web.dev/articles/inp#lab-measurement) Interaction to Next Paint (INP). Following Google’s methodology, if a website reaches the 75th percentile for each metric, it is labeled as "passed"; otherwise, it is marked as "failed."

The following metrics are included in the report:

- Core Web Vitals (LCP, CLS, TBT)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- First Contentful Paint (FCP)
- Total Blocking Time (TBT)
- Time to First Byte (TTFB)

Performance scores are also provided:

- Performance
- Accessibility
- Best Practices
- SEO

Additionally, the application supports:

- Setting the text language. Currently available in English (`en`) and Brazilian Portuguese (`pt-BR`)
- Analyzing multiple websites
- Sending reports to multiple recipients
- Configuring sender, recipients, websites, and language (locale) via environment variables

Learn more about [Core Web Vitals](https://web.dev/explore/learn-core-web-vitals).

## Usage

### Requirement

- [Resend](https://resend.com/) API Key

### Setup

To use this workflow, you need to configure the following environment variables in GitHub Secrets:

1. Clone or fork this repository.

2. Add the secrets to your GitHub repository. Go to `Settings > Secrets and variables > Actions` and add the necessary secrets.

    - `RESEND_API_KEY`: Your Resend API key.
    - `RESEND_EMAIL_FROM`: The sender's email address.
    - `RESEND_EMAIL_TO`: The recipient's email address.
    - `URLS`: The URLs you want to monitor.
    - `LOCALE`: The desired language for the report.

    Use the [.example.env](.example.env) file as a reference.

3. The workflow will run automatically with the configured cron job, or you can trigger it manually via `workflow_dispatch`. Use [crontab.guru](https://crontab.guru/) to edit the expression.

    ```yaml
    schedule:
        - cron: "0 11 * * 1"
    ```

### Example of sent email

Subject:
```
example.com - Core Web Vitals: failed - Performance: 56
```

Text:
```
URL: https://example.com
Created on: 11/22/2024, 18:53:13

- Web Vitals -
Core Web Vitals (LCP, CLS, TBT): failed
Largest Contentful Paint (LCP): poor
Cumulative Layout Shift (CLS): needs improvements
First Contentful Paint (FCP): needs improvements
Total Blocking Time (TBT): moderate
Time to First Byte (TTFB): good

- Scores -
Performance: 56
Accessibility: 82
Best Practices: 100
SEO: 100

This report is generated in a simulated environment without a real user.
```

## Development

### Requirements

- Deno 2.0.6+
- Google Chrome 131+
- Resend API Key

### Installation

1. Clone the repository.

    ```bash
    git clone git@github.com:celere-dev/web-vitals.git
    ```

2. Configure the variables in a `.env` file located in the project root directory. Use the [.example.env](.example.env) file as a reference.

    ```bash
    cp .example.env .env
    ```

3. Install the dependencies.

    ```bash
    deno install
    ```

4. Run the task.

    ```bash
    deno task send
    ```

### Development note

The warning "Not implemented: ClientRequest.options.createConnection" usually indicates that you are attempting to use a Node.js feature not supported by Deno.

## License

This project is licensed under the terms of the GNU General Public License v3.0.
